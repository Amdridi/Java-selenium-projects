
-- ******************REQUETE 1*********************


CREATE TABLE  ft_table ( 
    Id INT NOT NULL   AUTO_INCREMENT ,
    logins VARCHAR(255) DEFAULT 'toto' ,
    groupe ENUM('staff','student', 'other') NOT NULL,
    creation_date DATE NOT NULL,
    PRIMARY KEY (Id)
       
 ) ;


 -- ******************REQUETE 2*********************

INSERT INTO  ft_table  (logins  , groupe, creation_date )
VALUES 
        ('loki' ,'staff','2013-05-01'),
        ( 'scadoux','student','2014-01-01' ),
        ('chap','staff', '2011-04-27' ),
        ('bambou','staff', '2014-03-01' ),
         ( 'fantomet','staff', '2010-04-03' );


-- ******************REQUETE 3*********************

INSERT INTO ft_table(logins,creation_date)

SELECT fiche_personne.nom,fiche_personne.date_naissance
FROM fiche_personne
WHERE (fiche_personne.nom LIKE '%a%') AND (LENGTH (fiche_personne.nom)<9)
ORDER BY fiche_personne.nom
LIMIT 10;

UPDATE ft_table
SET ft_table.groupe='other'
WHERE (ft_table.Id>5);
         
-- ******************REQUETE 4*********************
UPDATE ft_table
SET creation_date = DATE_ADD(creation_date, INTERVAL 20 YEAR)
WHERE (Id>5);

-- ******************REQUETE 5*********************
DELETE FROM ft_table
WHERE ft_table.Id<=5;

-- ******************REQUETE 6*********************
SELECT film.titre, film.resum
FROM film
WHERE film.resum LIKE '%vincent%' 
ORDER BY film.id_film ;

-- ******************REQUETE 7********************
SELECT film.titre, film.resum
FROM film
WHERE film.resum LIKE '%42%'  OR  film.titre LIKE '%42%'
ORDER BY film.duree_min;

-- ******************REQUETE 8********************


SELECT fiche_personne.nom, fiche_personne.prenom, DATE_FORMAT(fiche_personne.date_naissance, '%Y %m %e') AS date_de_naissance
FROM fiche_personne 
WHERE DATE_FORMAT(fiche_personne.date_naissance, '%Y' )= 1989
ORDER BY fiche_personne.nom ;


-- ******************REQUETE 9********************
SELECT 
COUNT(film.titre) AS nb_court_metrage
FROM film
WHERE film.duree_min<=42;


-- ******************REQUETE 10*********************

SELECT film.titre AS Titre , film.resum  AS Resume , film.annee_prod AS ANNEPROD
FROM film
INNER JOIN genre ON genre.id_genre=film.id_genre
WHERE genre.nom ='experimental'
ORDER BY  film.annee_prod DESC;

-- ******************REQUETE 11*********************

SELECT  fiche_personne.nom  ,fiche_personne.prenom,abonnement.prix 
FROM fiche_personne
INNER JOIN membre ON membre.id_fiche_perso=fiche_personne.id_perso
INNER JOIN abonnement ON membre.id_abo=abonnement.id_abo
WHERE abonnement.prix > 42
ORDER BY fiche_personne.nom, fiche_personne.prenom ;


-- ******************REQUETE 12*********************

SELECT fiche_personne.nom, fiche_personne.prenom
FROM fiche_personne
WHERE fiche_personne.nom LIKE '%-%' OR  fiche_personne.prenom LIKE  '%-%'
ORDER BY fiche_personne.nom , fiche_personne.nom ;

-- ******************REQUETE 13*********************
SELECT   salle.id_salle,ROUND(AVG(salle.nbr_siege)) AS nb_moyen_sieg
FROM salle;

-- ******************REQUETE 14*********************

SELECT salle.etage_salle  AS etage , COUNT(salle.nbr_siege) AS siege
FROM  salle
GROUP BY salle.etage_salle
ORDER BY siege DESC;


-- ******************REQUETE 15*********************
SELECT REVERSE(TRIM(LEADING '0' FROM  distrib.telephone)) AS enohpelet
FROM distrib
WHERE distrib.telephone LIKE '05%';



-- ******************REQUETE 16*********************

SELECT COUNT(film.titre) AS films
FROM film
WHERE(film.date_debut_affiche BETWEEN '30/10/2006' AND '27/07/2007') OR (film.date_debut_affiche LIKE '%24-12%');


-- ******************REQUETE 17*********************

SELECT COUNT(abonnement.id_abo)  AS nb_abo , 
ROUND(AVG(abonnement.prix)) AS moy_abo,
MOD(SUM(abonnement.duree_abo),42) AS ft
FROM abonnement;

-- ******************REQUETE 19*********************