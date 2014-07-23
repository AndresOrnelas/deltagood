class UsersController < ApplicationController
	respond_to :json
	def index
		@users = User.all
		render json: User.all
    end
end
