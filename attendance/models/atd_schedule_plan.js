/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('atd_schedule_plan', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		week_calendar: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		atd_groupid: {
			type: DataTypes.STRING(36),
			allowNull: true,
			references: {
				model: 'atd_group',
				key: 'id'
			}
		},
		atd_scheid: {
			type: DataTypes.STRING(36),
			allowNull: true
		},
		is_rest: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0'
		},
		create_date: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'atd_schedule_plan',
		timestamps: false,
		freezeTableName: true
	});
};
