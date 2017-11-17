/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('rev_template', {
		id: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
		},
		template_name: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		template_code: {
			type: DataTypes.STRING(50),
			allowNull: false,
			primaryKey: true
		},
		template_type: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		create_user: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		create_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		is_use: {
			type: DataTypes.STRING(10),
			allowNull: true
		},
		icon_path: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		form_items: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		send_person: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		is_custom_tem: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: '0'
		}
	}, {
		tableName: 'rev_template',
		timestamps: false,
		freezeTableName: true
	});
};
