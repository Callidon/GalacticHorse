![Logo](https://raw.githubusercontent.com/Callidon/GalacticHorse/master/galactichorse/src/main/webapp/images/logo.png)
# GalacticHorse [![Build Status](https://travis-ci.org/Callidon/GalacticHorse.svg?branch=master)](https://travis-ci.org/Callidon/GalacticHorse)
Galactic Horse est un moteur de recherche enrichi dédié au handicap.

Il se décompose en deux applications :
* Une [extension Google Chrome](https://github.com/Callidon/GalacticHorse/releases) avec laquelle vous pouvez "annotez" des adresses avec des tags, anfin d'enrichir la page avec des informations liées au handicap. Par exemple, sur le site du restaurant "L’entrecôte", vous pouvez ajouter des champs comme "Accès facile" ou "Escalier", afin d'aider de futurs utilisateurs du site.
* Un [site web](https://galactic-horse.appspot.com/) qui vous permet d'effectuer des recherches Google classiques, mais enrichies avec les informations que des utilisateurs ont apporté dans notre base de données via l'extension.

#Installation simple de l'extension

Pour installer l'extension, télécharger-là dans la section [releases](https://github.com/Callidon/GalacticHorse/releases) de ce dépôt Github et extrayez l'archive zip dans un dossier. Puis, rendez-vous dans le menu **Extensions** de Google Chrome, puis cochez la case **Mode développeur**. Ensuite, cliquez sur **Charger l'extension non empaquetée** et sélectionnez le dossier que vous venez d'extraire depuis l'archive. Félicitations, l'extension **Galactic Horse** est maintenant installée !

#Utilisation avancée

Ce projet est open source. Le tutoriel suivant vous explique comment déployer votre propre version de Galactic Horse sur un serveur [Google App Engine](https://cloud.google.com/appengine/docs).

##Prérequis d'installation

Les outils suivants sont nécessaires pour installer Galactic Horse. Merci de vérifier que vous respectez les prérequis suivants :
* [git](https://git-scm.com/) en version 1.9 ou supérieure
* [npm](https://www.npmjs.com/) en version 3.3 ou supérieure
* [Maven](https://maven.apache.org/) en version 3.1 ou supérieure

##Installation

Commncez par clonez le dépôt en utilisant **git**
```bash
git clone https://github.com/Callidon/GalacticHorse.git
```

Ensuite, naviguez dans le dossier du projet et exécutez les scripts d'installation
```bash
cd GalacticHorse/

# installation des dépendances pour l'extension
scripts/install-chrome.sh

# installation des dépendances pour l'application Google App Engine
scripts/install-appengine.sh
```

##Installation de l'extension

Pour utiliser l'extension, rendez-vous dans le menu **Extensions** de Google Chrome, puis cochez la case **Mode développeur**. Ensuite, cliquez sur **Charger l'extension non empaquetée** et sélectionnez le dossier *extension* dans le dossier du projet.

##Déploiement

Pour déployez l'application Google App Engine, suivez les étapes suivantes :
* Rendez-vous dans la [console Google Développeur](https://console.developers.google.com/home/dashboard?project=galactic-horse) et créez un nouveau projet.
* Notez l'id de votre projet. Par exemple : *my-project-123*.
* Modifiez le fichier *pom.xml* situé dans le dossier *galactichorse* et remplacez la valeur dans la balise `<app.id>` par l'id de votre application.

Vous devriez obtenir un fichier *pom.xml* avec un contenu similaire au suivant :
```xml
<?xml version="1.0" encoding="UTF-8"?>
...

    <properties>
        <app.id>my-project-123</app.id>
        ...
    </properties>
...
```

Pour déployez l'application, il vous suffit de naviguez dans le dossier *galactichorse* et d'exécuter la commande `mvn appengine:update`. Il vous sera demandé de vous identifier avec votre compte Google, puis le déploiement de votre application s'effectuera de manière automatique.

Ce projet a été développer dans le cadre de la matière **Programmation Web & Cloud** enseignée en [Master 1 ALMA](http://www.master-info.univ-nantes.fr/87871211/0/fiche___pagelibre/&RH=1403710895111) à [l'Université de Nantes](http://www.univ-nantes.fr/), en partenariat avec l'association [ThinkCode](http://www.thinkcode.co/).
