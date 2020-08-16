# Myrith Bot V2

LA nouvelle version du bot Discord.

## Commandes

### Joueur


    .help

Permet d'obtenir la liste des commandes directement sur le Discord.


    .candidature

Lance le processus pour candidater à un rôle Staff.


    .rules

Envoie dans le salon où le message a été envoyé, les règles sous forme d'image.

### Staff

*Toutes les commandes de sanction, envoie automatiquement au joueur un message avec la raison, et durée de sa sanction. Le salon staff dédié à la liste des sanctions en recevra aussi un, avec ces mêmes informations, plus le Staff ayant donné la sanction.*


    .mute <@joueur> <temps> <raison>

Permet de rendre muet un joueur pendant une durée définie à l'avance.


    .ban <@joueur> <raison>

Permet de bannir un joueur avec une raison.


    .delete <nombre>

Supprime le nombre de message demandé. Ne peut pas supprimer les messages de plus de 14 jours.

  

### Administrateur

    .sondage <question>

Permet de créer un sondage structuré dans un embed. Ajoute les réactions nécessaires automatiquement.
  

## Automatisme


### Compteur de membres

Met un jour le nom d'un channel vocal sous permission, avec le nombre total de membres sur le serveur.
  

### Compteur de connecté(s)

Met un jour le nom d'un channel vocal sous permission, avec le nombre total de membres connectés sur le serveur en temps réel.
  

### Message de bienvenue & de départ.

Envoie dans le salon de bienvenue un message embed avec des informations sur le joueur. Si un joueur quitte le serveur, un message est aussi envoyé dans ce même salon.
