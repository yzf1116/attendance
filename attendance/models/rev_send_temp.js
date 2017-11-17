/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('rev_send_temp', {
		id: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
		},
		templateid: {
			type: DataTypes.STRING(36),
			allowNull: true
		},
		personid: {
			type: DataTypes.STRING(36),
			allowNull: true
		}
	}, {
		tableName: 'rev_send_temp',
		timestamps: false,
		freezeTableName: true
	});
};
