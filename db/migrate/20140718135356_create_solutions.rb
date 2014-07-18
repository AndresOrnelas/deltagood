class CreateSolutions < ActiveRecord::Migration
  def change
    create_table :solutions do |t|
    	t.boolean :bought
    	t.belongs_to :user
    	t.float :quantity
    	t.string :name
    	t.integer :lot
    	t.float :concentration

      t.timestamps
    end
  end
end
