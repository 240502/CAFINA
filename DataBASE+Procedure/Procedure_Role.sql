use cafina

Create Procedure Pro_Get_By_Id
	@id int
as
	Begin
		If(Not Exists(Select * From [Role] Where id =@id))
		Begin
			Return -1
		End
		Else
		Begin
			Select * From [Role]
			Where id = @id
		End
	End

Create procedure Pro_Create_Role
	@RoName nvarchar(50)
as
	Begin
		If(Exists (Select * from [Role]  where RoName  = @RoName))
		Begin
			Return -1
		End
		Else
		Begin
			Insert Into [Role] (RoName)
			Values (@RoName)
		End
	End

Create procedure Pro_Update_Role
	@id int,
	@RoName nvarchar(50)
as
	Begin
		If( Not Exists (Select * from [Role]  where RoName  = @id))
		Begin
			Return -1
		End
		Else
		Begin
			Update[Role]
			Set  RoName = @RoName
			Where id = @id
		End
	End

Create procedure Pro_Delete_Role
	@id int
as
	Begin
		If(Not exists (Select * From [Role] Where id = @id))
		Begin
			Return -1
		End
		Else
		Begin
			Delete [Role]
			Where id = @id
		End
	End


Create Procedure Pro_Search_Role
	@RoName nvarchar(50)
as
	Begin
		If(Not Exists (Select * From [Role] Where RoName = @RoName))
		Begin
			Return -1
		End
		Else 
		Begin
			Select * From [Role]
			Where RoName = @RoName
		End 
	End


