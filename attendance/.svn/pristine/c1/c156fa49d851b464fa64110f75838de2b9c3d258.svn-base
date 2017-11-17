/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('sys_user', {
		id: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
		},
		username: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		password: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		realname: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		departid: {
			type: DataTypes.STRING(36),
			allowNull: true
		},
		status: {
			type: DataTypes.STRING(10),
			allowNull: true
		},
		last_login_time: {
			type: DataTypes.DATE,
			allowNull: true
		},
		gender: {
			type: DataTypes.STRING(4),
			allowNull: true
		},
		phone: {
			type: DataTypes.STRING(32),
			allowNull: true
		}
	}, {
		tableName: 'sys_user',
		timestamps: false,
		freezeTableName: true
	});
};
