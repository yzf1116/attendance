/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('pl_role_police', {
		id: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
		},
		roleid: {
			type: DataTypes.STRING(36),
			allowNull: true
		},
		policeid: {
			type: DataTypes.STRING(36),
			allowNull: true
		}
	}, {
		tableName: 'pl_role_police',
		timestamps: false,
		freezeTableName: true
	});
};
