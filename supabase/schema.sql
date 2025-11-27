-- Table pour stocker les commandes
CREATE TABLE IF NOT EXISTS nexora_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  payment_reference TEXT UNIQUE,
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
CREATE INDEX IF NOT EXISTS idx_nexora_orders_payment_reference ON nexora_orders(payment_reference);
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
COMMENT ON TABLE nexora_orders IS 'Table pour stocker les commandes des clients';
COMMENT ON COLUMN nexora_orders.amount IS 'Montant en centimes (ex: 24900 pour 249€)';
COMMENT ON COLUMN nexora_orders.status IS 'Statut de la commande: pending, completed, failed, refunded';

-- Table pour stocker les soumissions du formulaire de contact
CREATE TABLE IF NOT EXISTS nexora_contacts_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  project_type TEXT NOT NULL,
  budget TEXT,
  message TEXT NOT NULL,
  consent BOOLEAN NOT NULL DEFAULT false,
  meta JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_nexora_contacts_submissions_email ON nexora_contacts_submissions(email);
CREATE INDEX IF NOT EXISTS idx_nexora_contacts_submissions_created_at ON nexora_contacts_submissions(created_at DESC);

-- RLS (Row Level Security) pour les soumissions de contact
ALTER TABLE nexora_contacts_submissions ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion publique (pour le formulaire de contact)
-- Cette politique permet à n'importe qui d'insérer une soumission de contact
CREATE POLICY "nexora_public_insert_contacts"
  ON nexora_contacts_submissions
  FOR INSERT
  WITH CHECK (true);

-- Politique pour permettre la lecture uniquement via service_role (pour l'administration)
-- Les utilisateurs authentifiés ne peuvent pas lire les soumissions par défaut
-- Seul le service_role (utilisé côté serveur) peut les lire

-- Commentaires pour la documentation
COMMENT ON TABLE nexora_contacts_submissions IS 'Table pour stocker les soumissions du formulaire de contact';
COMMENT ON COLUMN nexora_contacts_submissions.project_type IS 'Type de projet sélectionné (en texte)';
COMMENT ON COLUMN nexora_contacts_submissions.budget IS 'Budget approximatif sélectionné (en texte)';
COMMENT ON COLUMN nexora_contacts_submissions.meta IS 'Métadonnées supplémentaires (user agent, page, etc.)';

