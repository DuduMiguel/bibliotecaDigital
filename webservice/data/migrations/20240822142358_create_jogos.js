exports.up = function(knex) {
    return knex.schema.createTable('jogos',table => {
        table.increments('id')    
        table.string('titulo',60).notNullable()
        table.string('produtora',80).notNullable()
        table.integer('ano',4).notNullable()
        table.decimal('preco',9.2).notNullable()
        table.string('capa',200).notNullable()
    })
};


exports.down = function(knex) {
    return knex.schema.dropTableIfExists('jogos')
};
