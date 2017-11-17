/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('sys_role_menu', {
		id: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
		},
		menuid: {
			type: DataTypes.STRING(36),
			allowNull: true
		},
		roleid: {
			type: DataTypes.STRING(36),
			allowNull: true
		}
	}, {
		tableName: 'sys_role_menu',
		timestamps: false,
		freezeTableName: true
	});
};
