# OMNÉLYO — site vitrine

Site statique (HTML, CSS, JavaScript, sans dépendance), en ligne sur https://omnelyo.com/.

## Pages

- `/` accueil
- `/communication/`, `/digital/`, `/intelligence-artificielle/` : les trois pôles
- `/rendez-vous/` : prise de rendez-vous
- `/mentions-legales/`, `/cgu/`, `/cgv/`, `/confidentialite/`, `/cookies/`
- `404.html`, `sitemap.xml`, `robots.txt`, `vercel.json`

L'en-tête et le pied de page sont répétés dans chaque page : une modification du menu ou du pied de page doit être reportée partout.

## À personnaliser

- `js/main.js`, bloc `CONFIG` : adresse de contact, créneaux, durée du rendez-vous, adresse d'envoi du formulaire.
- Pages légales : champs surlignés en jaune (statut, SIRET, adresse, hébergeur, TVA, médiateur).

## Référencement

Chaque page a son titre, sa description, son adresse canonique et ses données structurées (schema.org). Après une mise en ligne : déclarer `https://omnelyo.com/sitemap.xml` dans Google Search Console.
