/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('rev_approval', {
		id: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
		},
		apply_code: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		is_agree: {
			type: DataTypes.INTEGER(1),
			allowNull: true
		},
		approverid: {
			type: DataTypes.STRING(36),
			allowNull: true
		},
		create_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		status: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		rev_applyid: {
			type: DataTypes.STRING(36),
			allowNull: true
		}
	}, {
		tableName: 'rev_approval',
		timestamps: false,
		freezeTableName: true
	});
};
