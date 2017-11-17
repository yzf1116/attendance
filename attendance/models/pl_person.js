/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('pl_person', {
		id: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
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
		login_flag: {
			type: DataTypes.STRING(1),
			allowNull: true,
			defaultValue: '0'
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
		del_flag: {
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
		}
	}, {
		tableName: 'pl_person',
		timestamps: false,
		freezeTableName: true
	});
};
