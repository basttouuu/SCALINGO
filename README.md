#  Portfolio YBoost - Hugo Paulier
## JE SUIS AVEC SINGE EVAN SEDDA ET SON SHELL PT
Portfolio personnel développé dans le cadre du projet YBoost en B1 à YNOV Campus Aix-En-Provence.

**🔗 Application en ligne** : https://portfolio-bastou.osc-fr1.scalingo.io/

## 📋 Présentation du projet

Ce portfolio est une application web moderne et responsive développée en **Go** qui présente mes compétences, mes projets et mes services en tant que développeur web. L'application est déployée sur **Scalingo** avec une base de données MySQL.

### 🛠️ Stack technique

- **Backend** : Go 1.25.0
- **Base de données** : MySQL
- **Templates** : HTML/Go Templates
- **Frontend** : HTML5, CSS3, JavaScript Vanilla
- **Déploiement** : Scalingo (PaaS)
- **Dépendances** :
  - `github.com/go-sql-driver/mysql` - Driver MySQL
  - `github.com/joho/godotenv` - Gestion des variables d'environnement

### 🎯 Objectifs

- Créer une application web full-stack avec Go
- Déployer sur une plateforme PaaS moderne (Scalingo)
- Intégrer une base de données MySQL
- Proposer une expérience utilisateur fluide et moderne

## 🚀 Installation et déploiement

### Prérequis

- **Go** 1.25.0 ou supérieur
- **Git**
- **Compte Scalingo** (pour le déploiement)
- **Scalingo CLI** (optionnel mais recommandé)

### Installation locale

1. **Cloner le projet**
   ```bash
   git clone https://github.com/votre-username/TP-Portfolio.git
   cd TP-Portfolio
   ```

2. **Installer les dépendances Go**
   ```bash
   go mod download
   ```

3. **Configurer les variables d'environnement**
   
   Créer un fichier `.env` à la racine :
   ```env
   PORT=8080
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=votre_mot_de_passe
   DB_NAME=portfolio
   ```

4. **Lancer l'application**
   ```bash
   go run main.go
   ```

5. **Accéder au site**
   ```
   http://localhost:8080
   ```

### 📦 Déploiement sur Scalingo

#### Option 1 : Via la CLI Scalingo (Recommandé)

1. **Installer Scalingo CLI**
   ```bash
   # Windows (avec Chocolatey)
   choco install scalingo
   
   # macOS/Linux
   curl -O https://cli-dl.scalingo.com/install && bash install
   ```

2. **Se connecter à Scalingo**
   ```bash
   scalingo login
   ```

3. **Créer l'application**
   ```bash
   scalingo create portfolio-bastou
   ```

4. **Ajouter l'addon MySQL**
   ```bash
   scalingo --app portfolio-bastou addons-add mysql mysql-starter-512
   ```

5. **Déployer l'application**
   ```bash
   git push scalingo master
   ```
   ou si vous êtes sur une autre branche :
   ```bash
   git push scalingo votre-branche:master
   ```

6. **Ouvrir l'application**
   ```bash
   scalingo --app portfolio-bastou open
   ```

#### Option 2 : Via le Dashboard Scalingo

1. Se connecter sur https://dashboard.scalingo.com
2. Cliquer sur "Create a new app"
3. Choisir un nom et une région (ex: `osc-fr1`)
4. Connecter votre dépôt GitHub
5. Dans l'onglet "Addons", ajouter MySQL
6. Dans l'onglet "Settings", configurer les variables d'environnement si nécessaire
7. Le déploiement se fait automatiquement à chaque push sur la branche principale

### 🔧 Configuration Scalingo

#### Variables d'environnement

Scalingo configure automatiquement certaines variables :
- `PORT` : Défini automatiquement par Scalingo
- `DATABASE_URL` : Créé automatiquement par l'addon MySQL

Pour définir des variables personnalisées :
```bash
scalingo --app portfolio-bastou env-set MA_VARIABLE="ma_valeur"
```

#### Fichiers importants

- **`Procfile`** : Définit comment démarrer l'application
  ```
  web: bin/Portfolio
  ```

- **`go.mod`** : Gère les dépendances Go
- **`Dockerfile`** : Alternative pour le déploiement (optionnel)

## ✨ Fonctionnalités

### 🎨 Interface utilisateur

- **Mode sombre/clair** : Switch avec sauvegarde des préférences (localStorage)
- **Navigation responsive** : Menu hamburger animé sur mobile/tablette
- **Animations fluides** : Transitions optimisées pour les performances
- **Design adaptatif** : Responsive sur tous les écrans

### 📱 Sections du portfolio

1. **Accueil** : Présentation avec effet machine à écrire et carrousel de photos
2. **À Propos** : Histoire personnelle et points forts
3. **Services** : Liste des services proposés avec descriptions
4. **Compétences** : Barres de progression animées
5. **Projets** : Présentation des projets avec système de filtrage
6. **Contact** : Formulaire de contact avec validation

### 🗄️ Backend (Go)

- **Routage** : Gestion des routes avec package `router`
- **Templates** : Rendu des pages HTML avec Go Templates
- **Base de données** : Connexion MySQL pour la persistance des données
- **Variables d'environnement** : Configuration via `.env` en local et variables Scalingo en production

## 🗂️ Structure du projet

```
TP-Portfolio/
├── main.go                     
├── go.mod                      
├── Procfile                    
├── Dockerfile                  
├── README.md                   
├── src/
│   ├── router/                 
│   │   ├── router.go          
│   │   ├── todo.go            
│   │   ├── add.go            
│   │   └── supp.go            
│   ├── templates/             
│   │   ├── templates.go       
│   │   ├── index.html         
│   │   └── todo.html          
│   └── static/                
│       ├── css/
│       │   └── index.css      
│       ├── js/
│       │   └── script.js      
│       ├── img/              
│       └── cv.txt           
```

## Dépannage

### Problèmes courants

#### L'application ne démarre pas localement
```bash
# Vérifier la version de Go
go version

# Regénérer les dépendances
go mod tidy

# Reconstruire l'application
go build -o Portfolio
```

#### Erreur de connexion à la base de données
- Vérifier que MySQL est lancé
- Vérifier les credentials dans le fichier `.env`
- Vérifier que la base de données existe

#### Échec du déploiement sur Scalingo
```bash
# Voir les logs de l'application
scalingo --app portfolio-bastou logs

# Voir les logs de déploiement
scalingo --app portfolio-bastou deployment-logs

# Redémarrer l'application
scalingo --app portfolio-bastou restart
```

## 📚 Commandes utiles

### Scalingo CLI

```bash
# Voir les logs en temps réel
scalingo --app portfolio-bastou logs -f

# Accéder au shell de l'application
scalingo --app portfolio-bastou run bash

# Lister les variables d'environnement
scalingo --app portfolio-bastou env

# Voir les informations de la base de données
scalingo --app portfolio-bastou addons

# Accéder à MySQL
scalingo --app portfolio-bastou mysql-console
```

### Go

```bash
# Compiler l'application
go build -o Portfolio

# Lancer les tests
go test ./...

# Mettre à jour les dépendances
go get -u ./...
go mod tidy

# Formater le code
go fmt ./...
```

## 🔒 Sécurité

- Les variables d'environnement sensibles sont stockées dans Scalingo (pas dans le code)
- Le fichier `.env` est exclu du versioning (`.gitignore`)
- Les connexions MySQL utilisent des credentials sécurisés
- HTTPS activé automatiquement sur Scalingo

## 📊 Monitoring

Scalingo fournit nativement :
- **Métriques** : CPU, RAM, requêtes HTTP
- **Logs** : Accès et erreurs en temps réel
- **Alertes** : Notifications en cas de problème
- **Backups** : Sauvegardes automatiques de la base de données

Accès via le dashboard : https://dashboard.scalingo.com

## 🎓 Contexte académique

**Formation** : B1 Informatique  
**École** : YNOV Campus Aix-En-Provence  
**Projet** : YBoost  
**Date** : 2025-2026  
**Auteur** : Hugo Paulier

## 💡 Points forts du projet

1. **Application full-stack** : Backend Go + Frontend moderne
2. **Déploiement PaaS** : Hébergé sur Scalingo avec CI/CD
3. **Base de données** : Persistance avec MySQL
4. **Code propre** : Architecture organisée et maintenable
5. **Responsive design** : Adapté à tous les écrans
6. **Production ready** : Variables d'environnement, logs, monitoring

## 🔗 Liens utiles

- **Application** : https://portfolio-bastou.osc-fr1.scalingo.io/
- **Dashboard Scalingo** : https://dashboard.scalingo.com
- **Documentation Scalingo** : https://doc.scalingo.com
- **Go Documentation** : https://golang.org/doc/

## 📝 Licence

Ce projet est développé dans un cadre académique à YNOV Campus Aix-En-Provence.

---

**🚀 Développé avec Go et déployé sur Scalingo**
