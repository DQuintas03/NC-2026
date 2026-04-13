import requests
import sys
import io
import tempfile
import os
from datetime import datetime

class TUBAPITester:
    def __init__(self, base_url="https://hub-analise-tub.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, expected_fields=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}" if endpoint else f"{self.api_url}/"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            if success:
                try:
                    response_data = response.json()
                    print(f"✅ Passed - Status: {response.status_code}")
                    
                    # Check expected fields if provided
                    if expected_fields:
                        for field in expected_fields:
                            if field not in response_data:
                                print(f"⚠️  Warning: Expected field '{field}' not found in response")
                            else:
                                print(f"   ✓ Field '{field}' present")
                    
                    self.tests_passed += 1
                    return True, response_data
                except Exception as json_error:
                    print(f"❌ Failed - JSON parsing error: {str(json_error)}")
                    self.failed_tests.append(f"{name}: JSON parsing failed")
                    return False, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")
                self.failed_tests.append(f"{name}: Status {response.status_code}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append(f"{name}: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test(
            "Root API Endpoint",
            "GET",
            "",
            200,
            ["message"]
        )

    def test_health_endpoint(self):
        """Test health endpoint"""
        return self.run_test(
            "Health Check",
            "GET", 
            "health",
            200,
            ["status"]
        )

    def test_overview_endpoint(self):
        """Test overview endpoint with real data"""
        success, data = self.run_test(
            "Overview Data",
            "GET",
            "overview",
            200,
            ["total_nao_conformidades", "areas"]
        )
        
        if success:
            # Check if we have the expected real data structure
            total = data.get("total_nao_conformidades", "0")
            areas = data.get("areas", [])
            print(f"   ✓ Total non-conformities: {total}")
            print(f"   ✓ Areas count: {len(areas)}")
            
            # Verify areas structure
            expected_areas = ["Acertos", "Trocas", "Faltas de Circulacao"]
            for area in areas:
                if "name" in area and "count" in area:
                    print(f"   ✓ {area['name']}: {area['count']} records")
                else:
                    print(f"   ⚠️  Area missing required fields: {area}")
        
        return success, data

    def test_acertos_kpis(self):
        """Test Acertos KPIs endpoint"""
        success, data = self.run_test(
            "Acertos KPIs",
            "GET",
            "kpis/acertos",
            200,
            ["area", "kpis"]
        )
        
        if success and "kpis" in data:
            kpis = data["kpis"]
            expected_kpi_count = 4
            if len(kpis) == expected_kpi_count:
                print(f"   ✓ Correct number of KPIs: {len(kpis)}")
                # Check first KPI structure
                if kpis and all(key in kpis[0] for key in ["label", "value", "change", "trend", "icon"]):
                    print("   ✓ KPI structure is correct")
                else:
                    print("   ⚠️  KPI structure missing required fields")
            else:
                print(f"   ⚠️  Expected {expected_kpi_count} KPIs, got {len(kpis)}")
        
        return success, data

    def test_trocas_kpis(self):
        """Test Trocas KPIs endpoint"""
        success, data = self.run_test(
            "Trocas KPIs",
            "GET",
            "kpis/trocas",
            200,
            ["area", "kpis"]
        )
        
        if success and "kpis" in data:
            kpis = data["kpis"]
            expected_kpi_count = 4
            if len(kpis) == expected_kpi_count:
                print(f"   ✓ Correct number of KPIs: {len(kpis)}")
            else:
                print(f"   ⚠️  Expected {expected_kpi_count} KPIs, got {len(kpis)}")
        
        return success, data

    def test_faltas_kpis(self):
        """Test Faltas KPIs endpoint"""
        success, data = self.run_test(
            "Faltas KPIs",
            "GET",
            "kpis/faltas",
            200,
            ["area", "kpis"]
        )
        
        if success and "kpis" in data:
            kpis = data["kpis"]
            expected_kpi_count = 4
            if len(kpis) == expected_kpi_count:
                print(f"   ✓ Correct number of KPIs: {len(kpis)}")
            else:
                print(f"   ⚠️  Expected {expected_kpi_count} KPIs, got {len(kpis)}")
        
        return success, data

    def test_upload_stats_endpoint(self):
        """Test upload stats endpoint"""
        success, data = self.run_test(
            "Upload Stats",
            "GET",
            "upload-stats",
            200,
            ["acertos", "trocas", "faltas", "total"]
        )
        
        if success:
            print(f"   ✓ Acertos: {data.get('acertos', 0)} records")
            print(f"   ✓ Trocas: {data.get('trocas', 0)} records") 
            print(f"   ✓ Faltas: {data.get('faltas', 0)} records")
            print(f"   ✓ Total: {data.get('total', 0)} records")
        
        return success, data

    def test_date_filtering(self):
        """Test date range filtering on KPIs"""
        # Test with specific date range that should have data
        success, data = self.run_test(
            "Date Filtering (2024-01-15 to 2024-01-17)",
            "GET",
            "kpis/acertos?start_date=2024-01-15&end_date=2024-01-17",
            200,
            ["area", "kpis"]
        )
        
        if success and "kpis" in data:
            kpis = data["kpis"]
            # Check if we get filtered results
            total_kpi = next((kpi for kpi in kpis if "Total" in kpi.get("label", "")), None)
            if total_kpi:
                print(f"   ✓ Filtered total: {total_kpi.get('value', 'N/A')}")
            else:
                print("   ⚠️  No total KPI found in filtered results")
        
        return success, data

    def test_csv_upload_simulation(self):
        """Test CSV upload endpoint (simulation without actual file)"""
        # Test the upload endpoint structure - we'll test with a mock request
        # to see if the endpoint exists and responds appropriately
        print(f"\n🔍 Testing CSV Upload Endpoint Structure...")
        print(f"   URL: {self.api_url}/upload/acertos")
        
        try:
            # Test with empty POST to see if endpoint exists
            response = requests.post(f"{self.api_url}/upload/acertos", timeout=10)
            
            # We expect either 422 (validation error) or 400 (bad request) for missing file
            if response.status_code in [400, 422]:
                print(f"✅ Upload endpoint exists - Status: {response.status_code}")
                print("   ✓ Endpoint properly validates file requirement")
                self.tests_passed += 1
                self.tests_run += 1
                return True
            else:
                print(f"❌ Unexpected response - Status: {response.status_code}")
                print(f"   Response: {response.text[:200]}...")
                self.failed_tests.append(f"CSV Upload: Unexpected status {response.status_code}")
                self.tests_run += 1
                return False
                
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append(f"CSV Upload: {str(e)}")
            self.tests_run += 1
            return False

    def test_data_retrieval_endpoints(self):
        """Test data retrieval endpoints for each area"""
        areas = ["acertos", "trocas", "faltas"]
        
        for area in areas:
            success, data = self.run_test(
                f"Data Retrieval - {area.title()}",
                "GET",
                f"data/{area}",
                200,
                ["area", "total", "data"]
            )
            
            if success:
                total = data.get("total", 0)
                records = data.get("data", [])
                print(f"   ✓ {area.title()}: {total} total records, {len(records)} returned")
                
                # Check record structure if we have data
                if records and len(records) > 0:
                    first_record = records[0]
                    expected_fields = ["id", "data", "linha", "motorista", "created_at"]
                    missing_fields = [field for field in expected_fields if field not in first_record]
                    if not missing_fields:
                        print(f"   ✓ Record structure is correct")
                    else:
                        print(f"   ⚠️  Missing fields in record: {missing_fields}")
        
        return True

def main():
    print("🚀 Starting TUB API Testing...")
    print("=" * 50)
    
    # Setup
    tester = TUBAPITester()
    
    # Run all tests
    print("\n📋 Testing Core API Endpoints...")
    tester.test_root_endpoint()
    tester.test_health_endpoint()
    
    print("\n📊 Testing Data Endpoints...")
    tester.test_overview_endpoint()
    tester.test_acertos_kpis()
    tester.test_trocas_kpis()
    tester.test_faltas_kpis()
    
    print("\n📈 Testing New Real Data Features...")
    tester.test_upload_stats_endpoint()
    tester.test_date_filtering()
    tester.test_csv_upload_simulation()
    tester.test_data_retrieval_endpoints()

    # Print results
    print("\n" + "=" * 50)
    print(f"📊 FINAL RESULTS:")
    print(f"   Tests passed: {tester.tests_passed}/{tester.tests_run}")
    print(f"   Success rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    if tester.failed_tests:
        print(f"\n❌ Failed tests:")
        for failed_test in tester.failed_tests:
            print(f"   - {failed_test}")
    else:
        print(f"\n✅ All tests passed!")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())