const data = [
    {
        "id": 1,
        "name": "Bulbasaur",
        "type": ["Grass", "Poison"],
        "hp": 45,
        "attack": 49,
        "defense": 49,
        "img": "https://files.cults3d.com/uploaders/16165612/illustration-file/2bc70fa4-f03c-4173-93a7-560b522dc2b7/Bulbasaur_Pose01.jpg"
    },
    {
        "id": 2,
        "name": "Charmander",
        "type": ["Fire"],
        "hp": 39,
        "attack": 52,
        "defense": 43,
        "img":"https://files.cults3d.com/uploaders/17560495/illustration-file/f36bd31f-96f5-49f7-a9ab-255241ccf7c1/charmander.jpg"
    },
    {
        "id": 3,
        "name": "Squirtle",
        "type": ["Water"],
        "hp": 44,
        "attack": 48,
        "defense": 65,
        "img":"https://http2.mlstatic.com/D_NQ_NP_805407-MLA46642676610_072021-O.jpg"
    },
    {
        "id": 4,
        "name": "Pikachu",
        "type": ["Electric"],
        "hp": 35,
        "attack": 55,
        "defense": 40,
        "img":"http://www.smashbros.com/images/og/pikachu.jpg"
    },
    {
        "id": 5,
        "name": "Jigglypuff",
        "type": ["Normal", "Fairy"],
        "hp": 115,
        "attack": 45,
        "defense": 20,
        "img":"https://files.cults3d.com/uploaders/16165612/illustration-file/29a2a5e9-536a-48cc-91cb-f7614ff1691b/Jigglypuff04.jpg"
    },
    {
        "id": 6,
        "name": "Geodude",
        "type": ["Rock", "Ground"],
        "hp": 40,
        "attack": 80,
        "defense": 100,
        "img":"https://i.chzbgr.com/original/8821080320/h09DAA8C7/nintendo-pokemon-geodude-with-legs-weird"
    },
    {
        "id": 7,
        "name": "Abra",
        "type": ["Psychic"],
        "hp": 25,
        "attack": 20,
        "defense": 15,
        "img": "https://lanetaneta.com/wp-content/uploads/2022/08/Pokemon-GO-Guia-de-incursiones-de-Abra-mejores-contadores-y.jpg"
    },
    {
        "id": 8,
        "name": "Alakazam",
        "type": ["Psychic"],
        "hp": 55,
        "attack": 50,
        "defense": 45,
        "img":"https://files.cults3d.com/uploaders/17560495/illustration-file/75b760d6-d22e-471e-bbc4-826a61e9e015/alakazam.jpg"
    },
    {
        "id": 9,
        "name": "Machop",
        "type": ["Fighting"],
        "hp": 70,
        "attack": 80,
        "defense": 50,
        "img":"https://img.pokemondb.net/sprites/home/normal/2x/machop.jpg"
    },
    {
        "id": 10,
        "name": "Gengar",
        "type": ["Ghost", "Poison"],
        "hp": 60,
        "attack": 65,
        "defense": 60,
        "img":"https://files.cults3d.com/uploaders/16165612/illustration-file/3ca64fc7-3e31-420b-a483-416c9d308414/Gengar01.jpg"
    },
    {
        "id": 11,
        "name": "Mr. Mime",
        "type": ["Psychic", "Fairy"],
        "hp": 40,
        "attack": 45,
        "defense": 65,
        "img":"https://images.wikidexcdn.net/mwuploads/wikidex/1/13/latest/20200912062301/EP1096_Mr._Mime.png"
    },
    {
        "id": 12,
        "name": "Koffing",
        "type": ["Poison"],
        "hp": 40,
        "attack": 65,
        "defense": 95,
        "img":"https://media.sketchfab.com/models/430628c93a4c414d85555d5e272bcfe7/thumbnails/6178579b400342ff802a43e53f329030/8d86f0d643b749258bc14df12778d5c3.jpeg"
    },
    {
        "id": 13,
        "name": "Diglett",
        "type": ["Ground"],
        "hp": 10,
        "attack": 55,
        "defense": 25,
        "img":"https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-blue-version/c/c9/Diglett.gif"
    },
    {
        "id": 14,
        "name": "Dugtrio",
        "type": ["Ground"],
        "hp": 35,
        "attack": 100,
        "defense": 50,
        "img":"https://files.cults3d.com/uploaders/18279369/illustration-file/5f3a7eac-9f2a-4562-92ff-169933ebd414/Frontal.png"
    },
    {
        "id": 15,
        "name": "Pidgey",
        "type": ["Normal", "Flying"],
        "hp": 40,
        "attack": 45,
        "defense": 40,
        "img":"https://files.cults3d.com/uploaders/17560495/illustration-file/3762d428-0819-445e-886a-8ce1b321500c/pidgey.jpg"
    },
    {
        "id": 16,
        "name": "Rattata",
        "type": ["Normal"],
        "hp": 30,
        "attack": 56,
        "defense": 35,
        "img":"https://files.cults3d.com/uploaders/17560495/illustration-file/94afac5a-2a0e-4dae-9d41-4c847dffa1a0/rattata.jpg"
    },
    {
        "id": 17,
        "name": "Spearow",
        "type": ["Normal", "Flying"],
        "hp": 40,
        "attack": 60,
        "defense": 30,
        "img":"https://files.cults3d.com/uploaders/17560495/illustration-file/5370fe88-06df-4b2e-abd8-1322847d5819/spearow.jpg"
    },
    {
        "id": 18,
        "name": "Ekans",
        "type": ["Poison"],
        "hp": 35,
        "attack": 60,
        "defense": 44,
        "img":"https://files.cults3d.com/uploaders/17560495/illustration-file/d706915f-a0ac-40db-aa18-7a63a440ca6f/ekans.jpg"
    },

    {
        "id": 19,
        "name": "Sandshrew",
        "type": ["Ground"],
        "hp": 50,
        "attack": 75,
        "defense": 85,
        "img":"https://media.sketchfab.com/models/33b93df803a14217a140aed5268f514c/thumbnails/efca4e195c95410dbaf736ff7c704404/ebf4a17f44c9488ba69b31014d6393a3.jpeg"
    }
]

export default data
