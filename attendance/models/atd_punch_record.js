/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('atd_punch_record', {
		id: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
		},
		policeid: {
			type: DataTypes.STRING(36),
			allowNull: true
		},
		work_time: {
			type: DataTypes.DATE,
			allowNull: true
		},
		off_work_time: {
			type: DataTypes.DATE,
			allowNull: true
		},
		work_status: {
			type: DataTypes.STRING(30),
			allowNull: true
		},
		off_work_status: {
			type: DataTypes.STRING(30),
			allowNull: true
		},
		record_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		type_value: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0'
		},
		is_overtime: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0'
		},
		overtime_hours: {
			type: DataTypes.STRING(30),
			allowNull: true
		},
		work_hours: {
			type: DataTypes.STRING(30),
			allowNull: true
		},
		late_long: {
			type: DataTypes.STRING(30),
			allowNull: true
		}
	}, {
		tableName: 'atd_punch_record',
		timestamps: false,
		freezeTableName: true
	});
};
