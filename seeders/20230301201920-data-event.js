'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('events', [
      {
        title: 'Event 1',
        start_date: new Date('2022-01-01T00:00:00.000Z'),
        end_date: new Date('2022-01-03T00:00:00.000Z'),
        thumbnail: 'https://example.com/event1.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Event 2',
        start_date: new Date('2022-02-01T00:00:00.000Z'),
        end_date: new Date('2022-02-03T00:00:00.000Z'),
        thumbnail: 'https://example.com/event2.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Event 3',
        start_date: new Date('2022-03-01T00:00:00.000Z'),
        end_date: new Date('2022-03-03T00:00:00.000Z'),
        thumbnail: 'https://example.com/event3.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('events', null, {});
  }
};
