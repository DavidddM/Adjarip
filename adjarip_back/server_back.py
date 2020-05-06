import flask
import requests
import json
from flask_cors import CORS, cross_origin

app = flask.Flask(__name__)
app.config["DEBUG"] = True

cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/search_film/<keyword>', methods=['GET'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def search_film(keyword):
    url = f"https://api.adjaranet.com/api/v1/search-advanced?movie_filters%5Bwith_actors%5D=3&movie_filters%5Bwith_directors%5D=1&movie_filters%5Bkeyword=&movie_filters%5Byear_range%5D=1900%2C2019&movie_filters%5Binit%5D=true&filters%5Btype%5D=movie&keywords={keyword}&page=1&per_page=15"
    resp = requests.get(url)
    return_data = []
    for d in resp.json()['data']:
        title = (d['secondaryName'] or d['primaryName']) +f" ({d['year']})"
        return_data.append({
            'id': d['id'],
            'title': title,
            'poster': d['posters']['data']['240'],
            })
    return json.dumps(return_data)

@app.route('/get_seasons_count/<movieId>', methods=['GET'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def get_seasons_count(movieId):
    url = f"https://api.adjaranet.com/api/v1/movies/{movieId}"
    resp = requests.get(url)
    seasons_count = len(resp.json()['data']['seasons']['data'])
    return {'seasonsCount': seasons_count}

@app.route('/get_season_episodes/<movieId>/<seasonId>', methods=['GET'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def get_season_episodes(movieId, seasonId):
    url = f"https://api.adjaranet.com/api/v1/movies/{movieId}/season-files/{seasonId}"
    resp = requests.get(url)
    return_data = []
    for d in resp.json()['data']:
        lang_exists = lambda lang: any("ENG" in it["lang"] for it in d["files"])
        lang = "ENG" if lang_exists("ENG") else "GEO" if lang_exists("GEO") else "RUS"
        files_dict = next((item for item in d["files"] if item["lang"] == lang), dict()).get("files")
        highest_quality_link = next((item for item in files_dict if item["quality"]=="HIGH"), next(item for item in files_dict if item["quality"] == "MEDIUM")).get("src")
        poster = d['covers'].get('1920') or d['covers'].get('1050') or d['covers'].get('510') or d['covers'].get('367') or d['covers'].get('145') or d['poster']
        return_data.append({
            'title': f"{d['title']} ({d['episode']})",
            'id': highest_quality_link,
            'poster': poster,
            })

    return json.dumps(return_data)

app.run(host='0.0.0.0')
