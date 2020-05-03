module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    date: DataTypes.DATE
  })
  // Dois relacionamentos com a mesma tabela que é a usuario
  Appointment.associate = models => {
    // quem agendou e quem vai prestar o servico
    Appointment.belongsTo(models.User, { foreignKey: 'user_id' })
    Appointment.belongsTo(models.User, { foreignKey: 'provider_id' })
  }

  return Appointment
}
