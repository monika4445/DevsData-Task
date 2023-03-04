'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('reservations', [
      {
        eventId: 1,
        clientId: 1,
        reservationCode: 'ABC123',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        eventId: 1,
        clientId: 2,
        reservationCode: 'DEF456',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        eventId: 2,
        clientId: 3,
        reservationCode: 'GHI789',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('reservations', null, {});
  }
};
