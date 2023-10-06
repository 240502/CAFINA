use Cafina


Create Procedure Pro_Get_Cate_By_Id
	@id int
As
	Begin
		If(Not Exists (Select * From Category Where id = @id))
		Begin
			Return -1
		End
		Else
		Begin
			Select * From Category
			Where id = @id
		End
	End

Create Procedure Pro_Search_Cate_By_Name
	@CateName nvarchar(100)
As
	Begin
		If(Not Exists(Select * From Category Where CateName = @CateName))
		Begin
			Return -1
		End
		Else
		Begin
			Select * From Category Where CateName = @CateName
		End
	End
Alter proc Pro_Create_Cate
	@CateName nvarchar(100)
as
	begin
		if(exists (Select * from Category where CateName = @CateName))
		begin
			return -1
		end
		else
		begin
			insert into Category(CateName)
			values (@CateName)
		end
	end
Select * From Category Where CateName = N'Quần nót nam'
exec Pro_Create_Cate N'Quần nót nam'
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
