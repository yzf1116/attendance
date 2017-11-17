/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('sys_role', {
		id: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
		},
		rolename: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		rolecode: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		departid: {
			type: DataTypes.STRING(36),
			allowNull: true
		}
	}, {
		tableName: 'sys_role',
		timestamps: false,
		freezeTableName: true
	});
};
