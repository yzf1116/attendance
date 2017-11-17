/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('atd_schedule', {
		id: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		work_time: {
			type: DataTypes.STRING(19),
			allowNull: true
		},
		off_work_time: {
			type: DataTypes.STRING(19),
			allowNull: true
		},
		hours: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		is_crossday: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0'
		}
	}, {
		tableName: 'atd_schedule',
		timestamps: false,
		freezeTableName: true
	});
};
