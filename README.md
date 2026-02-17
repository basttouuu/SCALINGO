#  Portfolio YBoost - Hugo Paulier
## JE SUIS AVEC SINGE EVAN SEDDA ET SON SHELL PT
Portfolio personnel développé dans le cadre du projet YBoost en B1 à YNOV Campus Aix-En-Provence.

## 📋 Présentation du projet

Ce portfolio est un site web moderne et responsive qui présente mes compétences, mes projets et mes services en tant que développeur web. Il a été conçu avec un focus sur la performance, l'accessibilité et l'expérience utilisateur.

Le projet a été développé en utilisant une approche hybride : j'ai d'abord codé une base HTML/CSS à la main pour établir la structure et l'identité visuelle, puis j'ai utilisé l'IA (GitHub Copilot) pour enrichir et optimiser le projet.

### 🎯 Objectifs

- Créer une vitrine professionnelle de mes compétences
- Atteindre d'excellents scores de performance et d'accessibilité
- Proposer une expérience utilisateur fluide et moderne
- Démontrer ma maîtrise des technologies web modernes

## 🚀 Guide d'installation

Ce projet est un site web statique qui ne nécessite aucune installation particulière.

### Utilisation locale

1. **Cloner ou télécharger le projet**
   ```bash
   git clone [URL_DU_REPO]
   ```
   ou télécharger le ZIP directement

2. **Ouvrir le fichier index.html**
   - Double-cliquez sur `index.html`
   - Ou utilisez un serveur local (recommandé) :
     ```bash
     # Avec Python
     python -m http.server 8000
     
     # Avec Node.js (http-server)
     npx http-server
     
     # Avec VS Code
     Utilisez l'extension "Live Server"
     ```

3. **Accéder au site**
   - Navigateur : `http://localhost:8000` (si serveur local)
   - Ou directement via le fichier HTML

### Prérequis

- Aucun prérequis technique
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Connexion internet pour Font Awesome (optionnel, utilisé pour les icônes)

## ✨ Fonctionnalités implémentées

### 🎨 Interface utilisateur

- **Mode sombre/clair** : Switch automatique avec sauvegarde des préférences (localStorage)
  - Mode sombre : Noir profond (#0a0a0a) + Jaune or (#ffd700)
  - Mode clair : Blanc pur (#ffffff) + Orange (#ffa500)
- **Navigation responsive** : Menu hamburger animé sur mobile/tablette
- **Navigation intelligente** : Détection automatique de la section visible pendant le scroll
- **Animations fluides** : Transitions et animations optimisées pour les performances
- **Design adaptatif** : 5 breakpoints pour une expérience optimale sur tous les écrans

### 📱 Sections du portfolio

1. **Accueil**
   - Effet machine à écrire avec 5 titres en boucle
   - Carrousel automatique de 4 photos (fade in/out, 3s)
   - Présentation dynamique

2. **À Propos**
   - Histoire personnelle
   - Points forts
   - Fun facts

3. **Services**
   - 7 services proposés avec descriptions
   - Cards avec effets hover

4. **Compétences**
   - Barres de progression animées
   - Visualisation claire des niveaux

5. **Projets**
   - 4 projets présentés
   - Système de filtrage par catégorie
   - Images et descriptions

6. **Contact**
   - Formulaire de contact
   - Validation en temps réel
   - Compteur de caractères

### ⚡ Performance et optimisation

- **Critical CSS inline** : Styles critiques dans le `<head>` pour un rendu rapide
- **Lazy loading** : Chargement différé des images
- **Resource hints** : `preconnect` et `dns-prefetch` pour Font Awesome
- **Fetchpriority** : Priorisation des ressources critiques
- **Font Awesome différé** : Chargement asynchrone des icônes
- **Animations optimisées** : Fréquence réduite (pulse 6s, float 10s)
- **Back/Forward Cache** : Support pour une navigation plus rapide
- **Reduced motion** : Respect des préférences d'accessibilité

### ♿ Accessibilité

- **ARIA labels** : Sur tous les éléments interactifs
- **Structure sémantique** : Hiérarchie des headings respectée
- **Skip link** : Navigation clavier optimisée
- **Contraste** : Ratios de contraste conformes WCAG
- **Focus visible** : Indicateurs clairs pour la navigation au clavier

### 🔧 Technologies utilisées

- **HTML5** : Structure sémantique avec ARIA
- **CSS3** : 
  - Variables CSS pour la gestion des thèmes
  - Grid & Flexbox pour les layouts
  - Animations et transitions
  - Media queries (5 breakpoints)
- **JavaScript Vanilla ES6+** : Aucun framework, code maison optimisé
  - IntersectionObserver pour la navigation
  - LocalStorage pour les préférences
  - Gestion d'événements optimisée
- **Font Awesome** : Icônes (seule dépendance externe)

## 📊 Scores Lighthouse

### Desktop
- 🚀 Performance : **85-90/100**
- ♿ Accessibilité : **98/100**
- ✅ Best Practices : **100/100**
- 🔍 SEO : **100/100**

### Mobile
- 🚀 Performance : **80-85/100**
- ♿ Accessibilité : **98/100**
- ✅ Best Practices : **100/100**
- 🔍 SEO : **100/100**

## 📈 Statistiques du projet

- **622 lignes** de HTML
- **2785 lignes** de CSS
- **561 lignes** de JavaScript
- **8 images** (4 profils + 4 projets)
- **19 prompts** utilisés avec l'IA
- **~6-8h** de développement

## 📂 Structure du projet

```
TP-Portfolio/
├── index.html                 # Page principale
├── README.md                  # Ce fichier
├── DOCUMENTATION_PROMPTS.md   # Compte-rendu détaillé
├── assets/
│   ├── css/
│   │   └── index.css         # Styles principaux
│   ├── js/
│   │   └── script.js         # Scripts JavaScript
│   ├── img/
│   │   ├── profil1-4.png     # Photos de profil
│   │   └── project1-4.jpg    # Images de projets
│   └── cv.txt                # CV (optionnel)
```

## 🎓 Contexte académique

**Formation** : B1 Informatique  
**École** : YNOV Campus Aix-En-Provence  
**Projet** : YBoost  
**Date** : Novembre 2025  
**Auteur** : Hugo Paulier

## 📝 Documentation complémentaire

Pour plus de détails sur le processus de développement, les prompts utilisés, les difficultés rencontrées et les solutions apportées, consultez le fichier **DOCUMENTATION_PROMPTS.md**.

## 🌐 Navigation

Le site est conçu pour être intuitif et accessible :
- Navigation principale en haut (sticky)
- Menu hamburger sur mobile
- Liens d'ancrage pour accès rapide aux sections
- Skip link pour navigation clavier

## 💡 Points forts du projet

1. **Performance optimisée** : Scores Lighthouse excellents
2. **Accessibilité** : Quasi-parfait (98/100)
3. **Code propre** : Vanilla JS, pas de dépendances inutiles
4. **Responsive design** : Adapté à tous les écrans
5. **Expérience utilisateur** : Animations fluides, thèmes personnalisables
6. **SEO optimisé** : Meta tags complets, structure sémantique

## 🔮 Améliorations futures possibles

- Ajout d'un blog
- Intégration d'un CMS headless
- Mode de téléchargement du CV
- Formulaire de contact fonctionnel (backend)
- Animations plus poussées
- Support multilingue


https://portfolio-bastou.osc-fr1.scalingo.io/

# SCALINGO
