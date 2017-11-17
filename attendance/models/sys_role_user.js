/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('sys_role_user', {
		id: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
		},
		roleid: {
			type: DataTypes.STRING(36),
			allowNull: true,
			references: {
				model: 'sys_role',
				key: 'id'
			}
		},
		userid: {
			type: DataTypes.STRING(36),
			allowNull: true,
			references: {
				model: 'sys_user',
				key: 'id'
			}
		}
	}, {
		tableName: 'sys_role_user',
		timestamps: false,
		freezeTableName: true
	});
};
