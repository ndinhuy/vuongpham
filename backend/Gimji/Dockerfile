# ========================
# Stage 1: Runtime base
# ========================
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# ========================
# Stage 2: Build application
# ========================
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Gimji/Gimji.csproj", "Gimji/"]
RUN dotnet restore "Gimji/Gimji.csproj"
COPY . .
WORKDIR "/src/Gimji"
RUN dotnet build "Gimji.csproj" -c Release -o /app/build

# ========================
# Stage 3: Publish application
# ========================
FROM build AS publish
RUN dotnet publish "Gimji.csproj" -c Release -o /app/publish /p:UseAppHost=false

# ========================
# Stage 4: Final image
# ========================
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Tạo thư mục Images nếu chưa có
RUN mkdir -p /app/images

ENTRYPOINT ["dotnet", "Gimji.dll"]
