class Protocol < ActiveRecord::Base
	serialize :steps, Array

	has_many :runs
end
