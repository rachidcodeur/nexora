-- Table pour stocker les soumissions du formulaire de contact
-- À exécuter dans le SQL Editor de Supabase

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

-- Supprimer la politique si elle existe déjà (pour éviter les erreurs)
DROP POLICY IF EXISTS "nexora_public_insert_contacts" ON nexora_contacts_submissions;

-- Politique pour permettre l'insertion publique (pour le formulaire de contact)
-- Cette politique permet à n'importe qui d'insérer une soumission de contact
CREATE POLICY "nexora_public_insert_contacts"
  ON nexora_contacts_submissions
  FOR INSERT
  WITH CHECK (true);

-- Commentaires pour la documentation
COMMENT ON TABLE nexora_contacts_submissions IS 'Table pour stocker les soumissions du formulaire de contact';
COMMENT ON COLUMN nexora_contacts_submissions.project_type IS 'Type de projet sélectionné (en texte)';
COMMENT ON COLUMN nexora_contacts_submissions.budget IS 'Budget approximatif sélectionné (en texte)';
COMMENT ON COLUMN nexora_contacts_submissions.meta IS 'Métadonnées supplémentaires (user agent, page, etc.)';

