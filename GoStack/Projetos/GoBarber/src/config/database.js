module.exports = {
  dialect: 'postgres',
  host: '127.0.0.1',
  username: 'postgres',
  password: '1234',
  database: 'gonodemodulo2',
  operatorAliases: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true // usar snakeCase e nao com caixaAlta
  }
}
