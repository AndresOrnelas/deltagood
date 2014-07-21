class AddReagentsToSolutions < ActiveRecord::Migration
  def change
    add_column :solutions, :reagents, :text
  end
end
