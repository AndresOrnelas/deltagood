class CreateRuns < ActiveRecord::Migration
  def change
    create_table :runs do |t|
      t.integer :counter
      t.text :inputs
      t.text :times
      t.text :changeList
      t.belongs_to :user
      t.belongs_to :protocol
      t.integer :currentStep

      t.timestamps
    end
  end
end
