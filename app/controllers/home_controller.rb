class HomeController < ApplicationController
	def index
     redirect_to '/users/sign_up' if current_user.nil?
  end
end
