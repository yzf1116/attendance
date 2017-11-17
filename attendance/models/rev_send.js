/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('rev_send', {
		id: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
		},
		apply_code: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		send_personid: {
			type: DataTypes.STRING(36),
			allowNull: true
		},
		create_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		is_read: {
			type: DataTypes.INTEGER(1),
			allowNull: true
		}
	}, {
		tableName: 'rev_send',
		timestamps: false,
		freezeTableName: true
	});
};
