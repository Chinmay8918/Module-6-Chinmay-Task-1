# Use the .NET 8 SDK image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy everything
COPY . .

# Restore using the solution file
RUN dotnet restore ToDoApi/ToDoApi.sln

# Publish the API project
RUN dotnet publish ToDoApi/ToDoApi.csproj -c Release -o /app/publish

# Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "ToDoApi.dll"]
