# Uma biblioteca digital para o controle pessoal de jogos!
O projeto contém duas partes, um webService(feito em Express) que é o nosso back-end, e um webSite(feito em React) que é o nosso front-end.

O back-end faz o uso do Knex, que permite a possibilidade de utilizar arquivos de migrations e o uso de seeds para acrescentar dados iniciais a tabela.
Possui rotinas de cadastro que incluem: Criação, consulta, alteração e exclusão de dados (CRUD).
E uso de rotas para filtro de dados da tabela e dados gerenciais do sistema.

O front-end permite ao usuário controlar os próprios dados, que ficam armazenados no nosso back-end.
dando liberdade para visualizar, incluir, buscar por palavra-chave, editar e excluir seus jogos como bem entender.
além de permitir que ele veja os dados gerais, como: Total de jogos cadastrados, total investido em jogos, maior preço cadastrado e média de preço.
também conta com um gráfico que organiza o total de investimento em jogos por ano de lançamento.
