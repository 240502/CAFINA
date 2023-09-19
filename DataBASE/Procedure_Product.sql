create procedure GetAll
as
	begin
		select * from Product
	end
exec GetAll
create procedure GetbyId
	@productid varchar(100)
as
	begin
		select * from Product
		where ProductId = productid
	end
create procedure GetbyCateid
	@cateId int
as	
	begin 
		select * from Product
		where CateId = cateId
	end
create procedure GetByCateName
	@cateName nvarchar(100)
as
	begin
		select * from Product inner join Category
		on Product.CateId = Category.id
		where Category.CateName like @cateName
	end
create fulltext catalog Search
WITH accent_sensitivity = off
as default
create fulltext index on Product(title)
key index PK__Product__B40CC6CDF6FCAA9F

alter table Product
alter column title nvarchar(max)
create procedure SearchProduct
	@string nvarchar(200)
as 
	begin
		select * from Product
		where contains  (title,@string)
	end

exec SearchProduct N'áo or nữ'
select * from Product
alter table Product
alter column title ntext
DROP FULLTEXT INDEX ON Product
select * from Product


drop procedure Pro_Search_Product
Create procedure Pro_Search_Product
	@page_index  INT, 
	@page_size   INT,
	@tensp NVARCHAR(MAX),
	@loaisp int
as
	begin
		  DECLARE @RecordCount BIGINT;
        IF(@page_size <> 0)
            BEGIN
						SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY CateId ASC)) AS RowNumber, 
                              p.ProductId,
							  p.title,
							  p.price,
							  p.discount,
							  p.[description],
							  p.ChatLieu,
							  p.HuongDanSuDung,
							  p.size,
							  p.color,
							  p.CateId
                        INTO #Results1
                        FROM Product AS p
					    WHERE  (@tensp = N'' Or p.title like N'%'+@tensp+'%') and						
						(@loaisp =0 Or p.CateId =@loaisp);                   
                        SELECT @RecordCount = COUNT(*)
                        FROM #Results1;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Results1
                        WHERE ROWNUMBER BETWEEN(@page_index - 1) * @page_size + 1 AND(((@page_index - 1) * @page_size + 1) + @page_size) - 1
                              OR @page_index = -1;
                        DROP TABLE #Results1; 
            END;
            ELSE
            BEGIN
						SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY CateId ASC)) AS RowNumber, 
                              p.ProductId,
							  p.title,
							  p.price,
							  p.discount,
							  p.[description],
							  p.ChatLieu,
							  p.HuongDanSuDung,
							  p.size,
							  p.color,
							  p.CateId
                        INTO #Results2
                        FROM [Product] AS p
					    WHERE  (@tensp = N'' Or p.title like N'%'+@tensp+'%') and						
						(@loaisp =0 Or p.CateId =@loaisp);                   
                        SELECT @RecordCount = COUNT(*)
                        FROM #Results2;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Results2;                        
                        DROP TABLE #Results1; 
        END;
	end
exec Pro_Search_Product 1,10,N'Không có',1

USE [Cafina]
GO

/****** Object:  StoredProcedure [dbo].[Pro_Update_Product]    Script Date: 9/15/2023 11:11:17 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

alter procedure [dbo].[Pro_Update_Product]
	@ma varchar(100),
	@list_value nvarchar(max)
as 
	begin
	if(@list_value is not null)
	begin
		declare @bool int
		if( select @bool=( select JSON_PATH_EXISTS(@list_value,'$.title'))=0)
		begin
			update Product
			set title = (Select JSON_VALUE(l.value,'$.title') from OpenJson(@list_value) as l)
			where ProductId = @ma
		end
		if( select @bool=( select JSON_PATH_EXISTS(@list_value,'$.title'))=0)
		begin
			update Product
			set price = (Select JSON_VALUE(l.value,'$.price') from OpenJson(@list_value) as l)
			where ProductId = @ma
		end
		if( select @bool=( select JSON_PATH_EXISTS(@list_value,'$.title'))=0)
		begin
			update Product
			set price = (Select JSON_VALUE(l.value,'$.description') from OpenJson(@list_value) as l)
			where ProductId = @ma
		end
		if( select @bool=( select JSON_PATH_EXISTS(@list_value,'$.title'))=0)
		begin
			update Product
			set price = (Select JSON_VALUE(l.value,'$.chatLieu') from OpenJson(@list_value) as l)
			where ProductId = @ma
		end
	if( select @bool=( select JSON_PATH_EXISTS(@list_value,'$.title'))=0)
		begin
			update Product
			set price = (Select JSON_VALUE(l.value,'$.huongDanSuDung') from OpenJson(@list_value) as l)
			where ProductId = @ma
		end
		if( select @bool=( select JSON_PATH_EXISTS(@list_value,'$.title'))=0)
		begin
			update Product
			set price = (Select JSON_VALUE(l.value,'$.size') from OpenJson(@list_value) as l)
			where ProductId = @ma
		end
		if( select @bool=( select JSON_PATH_EXISTS(@list_value,'$.title'))=0)
		begin
			update Product
			set price = (Select JSON_VALUE(l.value,'$.color') from OpenJson(@list_value) as l)
			where ProductId = @ma
		end
		if( select @bool ( select JSON_PATH_EXISTS(@list_value,'$.title'))=0)
		begin
			update Product
			set price = (Select JSON_VALUE(l.value,'$.cateId') from OpenJson(@list_value) as l)
			where ProductId = @ma
		end
	end

select * from Product