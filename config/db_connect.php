<? 
//DB����
$MYSQL_HOST = "1.246.219.220";//ȣ��Ʈ�� IP Ȥ�� localhost
if($_SERVER['HTTP_HOST'] == 'www.healthcarebigdata.kr' || $_SERVER['HTTP_HOST'] == '1.246.219.211') $MYSQL_HOST = '192.168.0.102';
else $MYSQL_HOST = '1.246.219.220';

$MYSQL_DB = "health_care_ui";//DB ��
$MYSQL_ID = "lod_ui";//���̵�
$MYSQL_PASSWORD = "lod!@";//�н�����

$DB_CONNECT = mysql_connect($MYSQL_HOST, $MYSQL_ID, $MYSQL_PASSWORD);
	mysql_select_db($MYSQL_DB, $DB_CONNECT);
	if ( !$DB_CONNECT ) {echo "mysql ������ ���̽��� ������ �� �����ϴ�."; exit;}

	mysql_query("set session character_set_connection=utf8;");
	mysql_query("set session character_set_results=utf8;");
	mysql_query("set session character_set_client=utf8;");
	date_default_timezone_set('Asia/Seoul');
?>