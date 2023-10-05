use Cafina

create proc Pro_Create_Cate
	@id int,
	@CateName nvarchar(100)
as
	begin
		if(exists (Select * from Category where id = @id))
		begin
			return -1
		end
		else
		begin
			insert into Category(id,CateName)
			values (@id,@CateName)
		end
	end


create proc Pro_Delete_Cate
	@id int
as
	begin
		if(not exists(select * from Category where id = @id))
		begin
			return -1
		end
		else
		begin
			delete Category
			where id = @id
		end
	end

create proc Pro_Update_Cate
	@id int,
	@cateName nvarchar(100)
as
	begin
		if(not exists(select * from Category where id = @id))
		begin
			return -1
		end
		else
		begin
			update Category
			set CateName = @cateName
			where id = @id
		end
	end
