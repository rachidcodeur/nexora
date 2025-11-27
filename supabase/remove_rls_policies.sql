-- ⚠️ ATTENTION : Ce script retire toutes les politiques RLS de la table nexora_contacts_submissions
-- ⚠️ RISQUE : Sans RLS, n'importe qui avec la clé anon peut lire/écrire/modifier/supprimer toutes les données
-- ⚠️ UTILISEZ UNIQUEMENT si vous comprenez les risques et avez une autre méthode de sécurité en place

-- Supprimer toutes les politiques RLS existantes sur la table
DROP POLICY IF EXISTS "nexora_public_insert_contacts" ON nexora_contacts_submissions;
DROP POLICY IF EXISTS "nexora_public_select_contacts" ON nexora_contacts_submissions;
DROP POLICY IF EXISTS "nexora_public_update_contacts" ON nexora_contacts_submissions;
DROP POLICY IF EXISTS "nexora_public_delete_contacts" ON nexora_contacts_submissions;

-- Désactiver complètement RLS sur la table (optionnel mais recommandé si on retire toutes les politiques)
-- Si vous gardez RLS activé sans politiques, toutes les opérations seront bloquées
ALTER TABLE nexora_contacts_submissions DISABLE ROW LEVEL SECURITY;

-- Vérification : Afficher l'état de RLS (à exécuter séparément pour vérifier)
-- SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'nexora_contacts_submissions';

