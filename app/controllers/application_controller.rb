class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  respond_to :json, :html
  def index
    @users = User.all
  	@posts = Post.all
  end

  def test
  	respond_with User.all
  end

  def create
    # Create and save new post from data received from the client
    new_post = Post.create
    # new_post.title = params[:new_post][:title][0...250] # Get only first 250 characters
    # new_post.contents = params[:new_post][:contents]

    # Confirm post is valid and save or return HTTP error
    # if new_post.valid?
    #   new_post.save!
    # else
    #   render "public/422", :status => 422
    #   return
    # end

    # Respond with newly created post in json format
    respond_with(new_post) do |format|
      format.json { render :json => new_post.as_json }
    end
  end

  def post
    respond_with Post.all
  end
end
