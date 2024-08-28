exports.seed = async function (knex) {
  await knex('jogos').del()
  await knex('jogos').insert([
    {
      titulo: 'Grand Theft Auto V',
      produtora: 'Rockstar Games',
      ano: 2013,
      preco: 50.5,
      capa: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/header.jpg?t=1720472998'
    },
    {
      titulo: 'Red Dead Redemption 2',
      produtora: 'Rockstar Games',
      ano: 2018,
      preco: 150,
      capa: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg?t=1720558643'
    },
    {
      titulo: 'Wolfenstein II: The New Colossus',
      produtora: 'Machine Games',
      ano: 2017,
      preco: 80,
      capa: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/612880/header.jpg?t=1691683256'
    }
  ]);
};
