# base image
FROM node:8-slim as builder

# set working directory
RUN mkdir /usr/src/app
ADD dashboard /usr/src/app/dashboard
WORKDIR /usr/src/app/dashboard

RUN npm install
RUN npm install -g @angular/cli@6.1.5
ARG configuration=production
ENV HOST 192.168.10.11
RUN npm run build -- --output-path=./dist/out --configuration


FROM nginx
COPY --from=builder /usr/src/app/dashboard/dist/out /usr/share/nginx/html
EXPOSE 80
COPY ./entryPoint.sh /
RUN chmod +x entryPoint.sh
WORKDIR /usr/share/nginx/html

# Copy the EntryPoint
ENTRYPOINT ["/entryPoint.sh"]

CMD ["nginx", "-g", "daemon off;"]


