use Cafina

Create Proc Pro_Get_ListBST
As
	Begin
		Select * From BoSuTap
	End

Create Proc Pro_Get_BST_ById
	@id int
As
	Begin
		Select * From BoSuTap
		Where id = @id
	End

Create Proc Pro_Get_BST_ByName
	@name nvarchar(100)
As
	Begin
		Select * From BoSuTap
		Where TenBST = @name
	End

Create Proc Pro_Create_BST
	@name nvarchar(100)
As
	Begin
		If(Exists (Select * From BoSuTap Where TenBST = @name))
		Begin
			Return -1
		End
		Else 
		Begin
			Insert Into BoSuTap(TenBST)
			Values (@name)
		End
	End

Create Proc Pro_Update_BST
	@id int,
	@name nvarchar(100)
As
	Begin
		If( Not Exists (Select * From BoSuTap Where id = @id))
		Begin
			Return -1
		End
		Else 
		Begin
			Update BoSuTap
			Set TenBST = @name
			Where id = @id
		End
	End
Create Proc Pro_Delete_BST 
	@id int
As 
	Begin
		If(Not Exists (Select * From BoSuTap Where id = @id))
		Begin
			Return -1
		End
		Else 
		Begin
			Delete BoSuTap
			Where id = @id
		End	
	End

Select * From BoSuTap