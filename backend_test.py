import requests
import sys
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
        """Test overview endpoint"""
        return self.run_test(
            "Overview Data",
            "GET",
            "overview",
            200,
            ["total_nao_conformidades", "taxa_resolucao_global", "areas"]
        )

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