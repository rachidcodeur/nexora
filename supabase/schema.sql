-- Table pour stocker les commandes
CREATE TABLE IF NOT EXISTS nexora_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_session_id TEXT UNIQUE NOT NULL,
  stripe_payment_intent_id TEXT,
  stripe_refund_id TEXT,
  offer_id TEXT NOT NULL,
  offer_name TEXT NOT NULL,
  amount INTEGER NOT NULL, -- Montant en centimes
  currency TEXT NOT NULL DEFAULT 'eur',
  status TEXT NOT NULL DEFAULT 'pending', -- pending, completed, failed, refunded
  customer_email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  refunded_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_nexora_orders_user_id ON nexora_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_nexora_orders_stripe_session_id ON nexora_orders(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_nexora_orders_status ON nexora_orders(status);
CREATE INDEX IF NOT EXISTS idx_nexora_orders_created_at ON nexora_orders(created_at DESC);

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION nexora_update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour mettre à jour updated_at
CREATE TRIGGER nexora_update_orders_updated_at
  BEFORE UPDATE ON nexora_orders
  FOR EACH ROW
  EXECUTE FUNCTION nexora_update_updated_at_column();

-- RLS (Row Level Security) - Les utilisateurs ne peuvent voir que leurs propres commandes
ALTER TABLE nexora_orders ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre aux utilisateurs de voir leurs propres commandes
CREATE POLICY "nexora_users_can_view_own_orders"
  ON nexora_orders
  FOR SELECT
  USING (auth.uid() = user_id);

-- Politique pour permettre aux utilisateurs d'insérer leurs propres commandes (via l'API)
-- Note: L'insertion se fait généralement via l'API avec service_role, mais cette politique permet aussi l'insertion directe
CREATE POLICY "nexora_users_can_insert_own_orders"
  ON nexora_orders
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Politique pour permettre aux utilisateurs de mettre à jour leurs propres commandes (pour le statut)
CREATE POLICY "nexora_users_can_update_own_orders"
  ON nexora_orders
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Commentaires pour la documentation
COMMENT ON TABLE nexora_orders IS 'Table pour stocker les commandes Stripe des clients';
COMMENT ON COLUMN nexora_orders.amount IS 'Montant en centimes (ex: 24900 pour 249€)';
COMMENT ON COLUMN nexora_orders.status IS 'Statut de la commande: pending, completed, failed, refunded';

