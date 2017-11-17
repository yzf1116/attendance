/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('atd_schedule_group_view', {
		atd_groupid: {
			type: DataTypes.STRING(36),
			allowNull: false
		},
		atd_name: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		type: {
			type: DataTypes.STRING(10),
			allowNull: true
		},
		special_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		range: {
			type: "DOUBLE",
			allowNull: true
		},
		is_field: {
			type: "DOUBLE",
			allowNull: true
		},
		late_minutes: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			defaultValue: '60'
		},
		forth_hours: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			defaultValue: '3'
		},
		atd_scheduleid: {
			type: DataTypes.STRING(36),
			allowNull: false
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
		}
	}, {
		tableName: 'atd_schedule_group_view',
		timestamps: false,
		freezeTableName: true
	});
};
