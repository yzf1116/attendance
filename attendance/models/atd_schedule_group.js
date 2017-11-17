/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('atd_schedule_group', {
		id: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
		},
		scheduleid: {
			type: DataTypes.STRING(36),
			allowNull: true,
			references: {
				model: 'atd_schedule',
				key: 'id'
			}
		},
		groupid: {
			type: DataTypes.STRING(36),
			allowNull: true,
			references: {
				model: 'atd_group',
				key: 'id'
			}
		}
	}, {
		tableName: 'atd_schedule_group',
		timestamps: false,
		freezeTableName: true
	});
};
