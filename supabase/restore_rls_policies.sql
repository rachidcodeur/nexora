-- Script pour réactiver RLS et remettre les politiques sur nexora_contacts_submissions

-- Réactiver RLS sur la table
ALTER TABLE nexora_contacts_submissions ENABLE ROW LEVEL SECURITY;

-- Supprimer les anciennes politiques si elles existent (pour éviter les erreurs)
DROP POLICY IF EXISTS "nexora_public_insert_contacts" ON nexora_contacts_submissions;
DROP POLICY IF EXISTS "nexora_public_select_contacts" ON nexora_contacts_submissions;
DROP POLICY IF EXISTS "nexora_public_update_contacts" ON nexora_contacts_submissions;
DROP POLICY IF EXISTS "nexora_public_delete_contacts" ON nexora_contacts_submissions;

-- Politique pour permettre l'insertion publique (pour le formulaire de contact)
-- Cette politique permet à n'importe qui d'insérer une soumission de contact
CREATE POLICY "nexora_public_insert_contacts"
  ON nexora_contacts_submissions
  FOR INSERT
  WITH CHECK (true);

-- Vérification : Afficher l'état de RLS et les politiques (à exécuter séparément pour vérifier)
-- SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'nexora_contacts_submissions';
-- SELECT * FROM pg_policies WHERE tablename = 'nexora_contacts_submissions';

