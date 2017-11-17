/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('pl_atd_view', {
		personid: {
			type: DataTypes.STRING(36),
			allowNull: false
		},
		police_name: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		cardid: {
			type: DataTypes.STRING(18),
			allowNull: true
		},
		code: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		phone: {
			type: DataTypes.STRING(32),
			allowNull: true
		},
		age: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		photo: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		gender: {
			type: DataTypes.STRING(4),
			allowNull: true
		},
		password: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		pl_orgid: {
			type: DataTypes.STRING(36),
			allowNull: true
		},
		atd_groupid: {
			type: DataTypes.STRING(36),
			allowNull: true
		},
		last_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		status: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		responsible: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0'
		},
		birth: {
			type: DataTypes.DATE,
			allowNull: true
		},
		remarks: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		is_login: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0'
		},
		is_charge: {
			type: DataTypes.INTEGER(1),
			allowNull: true
		},
		is_lock: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0'
		},
		groupid: {
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
		}
	}, {
		tableName: 'pl_atd_view',
		timestamps: false,
		freezeTableName: true
	});
};
